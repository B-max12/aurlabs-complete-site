"use client";

import { useState, useEffect } from "react";
import { Users, Download, Search, Eye } from "lucide-react";

interface ProductAnalytics {
  slug: string;
  name: string;
  views: number;
  downloads: number;
  avgPosition: number;
  topKeywords: string[];
}

interface SEODashboardData {
  overview: {
    totalViews: number;
    totalDownloads: number;
    totalVisitors: number;
    avgPosition: number;
  };
  products: ProductAnalytics[];
}

/** SEO analytics dashboard view for the admin studio. */
export default function SEODashboard() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SEODashboardData | null>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData({
        overview: {
          totalViews: 45230,
          totalDownloads: 8934,
          totalVisitors: 12847,
          avgPosition: 12.4,
        },
        products: [
          { slug: "dear-diary", name: "Dear Diary", views: 15234, downloads: 3421, avgPosition: 8.2, topKeywords: ["dear diary app", "private journal"] },
          { slug: "aur-notes", name: "Aur Notes", views: 12342, downloads: 2893, avgPosition: 11.5, topKeywords: ["note taking app", "free notes"] },
          { slug: "aur-pocket", name: "Aur Pocket", views: 8934, downloads: 1567, avgPosition: 15.3, topKeywords: ["task manager"] },
          { slug: "aur-cli", name: "Aur CLI", views: 8720, downloads: 1053, avgPosition: 18.7, topKeywords: ["developer cli"] },
        ],
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeframe]);

  if (loading) return <div className="seo-dashboard loading">Loading analytics...</div>;
  if (!data) return null;

  return (
    <div className="seo-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>SEO Analytics</h1>
          <p>Track how your products perform in search</p>
        </div>
        <div className="timeframe-selector">
          {(["7d", "30d", "90d"] as const).map((tf) => (
            <button key={tf} type="button" className={timeframe === tf ? "active" : ""} onClick={() => setTimeframe(tf)}>
              {tf === "7d" ? "7 days" : tf === "30d" ? "30 days" : "90 days"}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Eye size={24} />
          <div>
            <span className="stat-value">{data.overview.totalViews.toLocaleString()}</span>
            <span className="stat-label">Total Views</span>
          </div>
        </div>
        <div className="stat-card">
          <Users size={24} />
          <div>
            <span className="stat-value">{data.overview.totalVisitors.toLocaleString()}</span>
            <span className="stat-label">Unique Visitors</span>
          </div>
        </div>
        <div className="stat-card">
          <Download size={24} />
          <div>
            <span className="stat-value">{data.overview.totalDownloads.toLocaleString()}</span>
            <span className="stat-label">Downloads</span>
          </div>
        </div>
        <div className="stat-card">
          <Search size={24} />
          <div>
            <span className="stat-value">{data.overview.avgPosition}</span>
            <span className="stat-label">Avg. Position</span>
          </div>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Product Performance</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Views</th>
                <th>Downloads</th>
                <th>Position</th>
                <th>Top Keyword</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <a href={`/${p.slug}`}>{p.name}</a>
                  </td>
                  <td>{p.views.toLocaleString()}</td>
                  <td>{p.downloads.toLocaleString()}</td>
                  <td>
                    <span className={`position ${p.avgPosition <= 10 ? "good" : p.avgPosition <= 20 ? "okay" : "bad"}`}>
                      #{p.avgPosition}
                    </span>
                  </td>
                  <td className="keyword">{p.topKeywords[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
