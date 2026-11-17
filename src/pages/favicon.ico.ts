import type { APIRoute } from 'astro';
import sharp from 'sharp';
import ico from 'sharp-ico';
import path from 'node:path';

// relative to project root
const faviconSrc = path.resolve('src/icons/favicon/favicon.png');

const ICO_SIZES = [16, 32];

export const GET: APIRoute = async () => {
  const buffers = await Promise.all(
    ICO_SIZES.map(
      async (size) =>
        await sharp(faviconSrc).resize(size).toFormat('png').toBuffer()
    )
  );

  const icoBuffer = ico.encode(buffers);

  return new Response(icoBuffer, {
    headers: { 'Content-Type': 'image/x-icon' },
  });
};
