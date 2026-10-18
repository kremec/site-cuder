export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return env.ASSETS.fetch(request);
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { Allow: "POST" } });
    }
    if (request.headers.get("Origin") !== url.origin) {
      return new Response(null, { status: 403 });
    }

    let bytes = 0;
    let data;
    try {
      const body = request.body?.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            bytes += chunk.byteLength;
            if (bytes > 16_384) throw new Error("Request too large");
            controller.enqueue(chunk);
          },
        }),
      );
      data = await new Response(body).json();
    } catch {
      return new Response(null, { status: bytes > 16_384 ? 413 : 400 });
    }

    const limits = { name: 100, contact: 200, location: 200, message: 4000 };
    if (
      !data ||
      typeof data !== "object" ||
      Object.entries(limits).some(
        ([key, limit]) =>
          typeof data[key] !== "string" || data[key].length > limit,
      )
    ) {
      return new Response(null, { status: 400 });
    }

    const name = data.name.trim();
    const contact = data.contact.trim();
    const location = data.location.trim();
    const message = data.message.trim();
    if (!name || !contact || !message) {
      return new Response(null, { status: 400 });
    }

    try {
      await env.CONTACT_EMAIL.send({
        from: "obrazec@sencila-cuder.com",
        to: "info@sencila-cuder.com",
        replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
          ? contact
          : undefined,
        subject: "Povpraševanje s spletne strani",
        text: [
          `Ime: ${name}`,
          `Kontakt: ${contact}`,
          `Lokacija: ${location}`,
          `Povpraševanje: ${message}`,
        ].join("\n"),
      });
    } catch {
      return new Response(null, { status: 502 });
    }

    return new Response(null, { status: 204 });
  },
};
