// /app/sitemap.xml/route.js
import {getCategoryTableData} from "@/api/frontend/category";
import {getLocationTableData} from "@/api/frontend/location";
import {getPropertyFilterData} from "@/api/frontend/property";
import {getBlogTableData} from "@/api/frontend/blog";
import {getBuilderTableData} from "@/api/frontend/builder";

export async function GET() {

  const baseUrl2 = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';  

  // Example: Fetching dynamic slugs from API or DB
  const res = await getCategoryTableData();
  const urls = res?.map((item) => `
    <url>
      <loc>${baseUrl2}property-list?cat=${item._id}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

 let filterlocation ={
      limit:100,
      page:  1
    }
  const reslocation = await getLocationTableData(filterlocation);

  const urlslocation = reslocation?.map((item) => `
    <url>
      <loc>${baseUrl2}property-list?location=${item._id}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const resproperty = await getPropertyFilterData(filterlocation);

  const urlproperty = resproperty.items?.map((item) => `
    <url>
      <loc>${baseUrl2}property-detail/${item.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');
  const resblog = await getBlogTableData();
  const urlblog = resblog?.map((item) => `
    <url>
      <loc>${baseUrl2}blog-detail/${item.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

   const resbuilder = await getBuilderTableData();

  const urlbuilder = resbuilder?.map((item) => `
    <url>
      <loc>${baseUrl2}builder/${item.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl2}</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
  <loc>${baseUrl2}/about-us</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
<url>
  <loc>${baseUrl2}/blogs</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${baseUrl2}/faq</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${baseUrl2}/news-and-insights</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${baseUrl2}/sell-your-property</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${baseUrl2}/contact</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${baseUrl2}/news-and-insights/market-trends</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>${baseUrl2}/news-and-insights/city-glimpse</loc>
  <lastmod>2025-07-14T12:00:46+00:00</lastmod>
  <priority>0.80</priority>
</url>
    ${urls}
    ${urlslocation}
    ${urlproperty}
    ${urlblog}
    ${urlbuilder}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
