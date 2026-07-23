import Link from "next/link";

export default async function AboutPage() {
  const values = [
    {
      icon: "❤️",
      title: "Health First",
      description: "Every product is designed to improve health and wellbeing.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We use biotechnology and fermentation science to improve nutrition.",
    },
    {
      icon: "🤝",
      title: "Accessibility",
      description: "Nutritious food should be affordable and accessible to everyone.",
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "We support local farmers and climate-resilient agriculture.",
    },
    {
      icon: "⭐",
      title: "Integrity",
      description: "Transparency, quality and accountability guide everything we do.",
    },
  ];

  return (
    <main className="bg-white pt-20">

      {/* =======================================================
          HERO
      ======================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur">
              🇺🇬 Proudly Made in Uganda
            </span>
            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Building the Future of
              <span className="block text-yellow-300">
                Plant-Based Nutrition
              </span>
            </h1>
            <p className="mt-8 text-xl leading-9 text-green-50 max-w-3xl">
              Aviyo Plant-Based Nutrition Ltd is a Ugandan for-profit social
              enterprise transforming locally grown crops into affordable,
              nutritious, and functional foods through biotechnology,
              fermentation science, and sustainable innovation.
            </p>
            <div className="flex flex-wrap gap-5 mt-12">
              <Link
                href="/products"
                className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          COMPANY STATISTICS
      ======================================================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
              <h2 className="text-5xl font-bold text-green-700">15M+</h2>
              <p className="mt-3 text-gray-600">Potential consumers across Uganda</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
              <h2 className="text-5xl font-bold text-green-700">428K+</h2>
              <p className="mt-3 text-gray-600">Children needing nutrition support annually</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
              <h2 className="text-5xl font-bold text-green-700">60–80%</h2>
              <p className="mt-3 text-gray-600">Ugandans affected by lactose intolerance</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border p-8 text-center">
              <h2 className="text-5xl font-bold text-green-700">100%</h2>
              <p className="mt-3 text-gray-600">Plant-based nutrition innovation</p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          WHO WE ARE
      ======================================================= */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="uppercase tracking-widest text-green-700 font-semibold">WHO WE ARE</p>
              <h2 className="text-4xl font-bold mt-3 text-gray-900">
                Transforming Local Agriculture into Better Nutrition
              </h2>
              <p className="mt-8 text-lg leading-9 text-gray-600">
                Aviyo Plant-Based Nutrition Ltd is a Ugandan for-profit social
                enterprise committed to developing affordable,
                science-driven plant-based foods using locally available
                agricultural resources.
              </p>
              <p className="mt-6 text-lg leading-9 text-gray-600">
                By combining biotechnology, controlled fermentation,
                nutrition science and sustainable food processing,
                we create nutritious products that improve public health,
                strengthen farmer livelihoods and reduce dependence
                on imported nutrition products.
              </p>
            </div>
            <div className="bg-green-50 rounded-3xl p-10">
              <h3 className="text-2xl font-bold mb-8">Why Aviyo Exists</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Combat malnutrition through affordable nutrition.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Support lactose-intolerant consumers with dairy-free alternatives.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Create value for Ugandan farmers using locally grown crops.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-600 text-2xl">✓</span>
                  <span className="text-gray-700">Build climate-resilient food systems through innovation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          OUR STORY
      ======================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="uppercase tracking-widest text-green-700 font-semibold">OUR STORY</p>
          <h2 className="text-4xl font-bold mt-3">A Vision Born in Uganda</h2>
          <p className="mt-8 text-lg leading-9 text-gray-600 max-w-4xl mx-auto">
            Founded in 2025 by Ahimbisibwe Mubarack together with a
            multidisciplinary team of professionals in health sciences,
            nutrition, agriculture, technology and industrial design,
            Aviyo was created to solve one of Uganda's biggest challenges:
            making nutritious food affordable, accessible and sustainable.
          </p>
          <p className="mt-6 text-lg leading-9 text-gray-600 max-w-4xl mx-auto">
            Today, Aviyo is developing innovative fermented plant-based foods
            that combine scientific research, local agriculture and modern
            food technology to improve nutrition while creating lasting social
            and economic impact.
          </p>
        </div>
      </section>

      {/* =======================================================
          MISSION & VISION
      ======================================================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="rounded-3xl bg-white border shadow-lg p-10">
              <div className="text-5xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="mt-6 text-lg leading-9 text-gray-600">
                To improve health outcomes by developing affordable,
                nutritious and functional plant-based foods using
                biotechnology, fermentation science and locally sourced
                agricultural resources while creating sustainable value
                for communities, farmers and investors.
              </p>
            </div>
            <div className="rounded-3xl bg-green-700 text-white shadow-xl p-10">
              <div className="text-5xl mb-6">🌍</div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="mt-6 text-lg leading-9 text-green-100">
                To become Africa's leading nutrition innovation company,
                advancing affordable, science-driven and sustainable food
                systems that improve lives while strengthening local
                agriculture and economic resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          THE PROBLEM
      ======================================================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-green-700 font-semibold">THE CHALLENGE</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">The Problem We're Solving</h2>
            <p className="text-lg text-gray-600 mt-6 max-w-4xl mx-auto leading-9">
              Uganda continues to face major nutrition challenges despite
              abundant agricultural resources. Millions of families cannot
              consistently access affordable, nutritious foods because of
              high food prices, dependence on imported products,
              lactose intolerance, post-harvest losses, and limited local
              food processing.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Current Challenges</h3>
              <ul className="space-y-5 text-gray-700">
                <li>• High rates of childhood malnutrition.</li>
                <li>• Heavy dependence on imported nutrition products.</li>
                <li>• High prevalence of lactose intolerance.</li>
                <li>• Limited processing of locally grown crops.</li>
                <li>• Climate change threatening food security.</li>
                <li>• Hidden hunger caused by micronutrient deficiencies.</li>
              </ul>
            </div>
            <div className="bg-green-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why This Matters</h3>
              <p className="leading-8 text-green-100">
                Poor nutrition affects children's growth,
                learning ability, productivity, household income
                and national economic development. At the same time,
                Ugandan farmers often sell raw crops with very little
                value addition, limiting their income and reducing the
                country's competitiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          OUR SOLUTION
      ======================================================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-green-700 font-semibold">OUR SOLUTION</p>
            <h2 className="text-4xl font-bold mt-3">Science Meets Local Agriculture</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="text-5xl mb-6">🌾</div>
              <h3 className="font-bold text-xl mb-4">Local Crops</h3>
              <p className="text-gray-600 leading-8">
                Soybeans, sorghum, millet,
                cassava and other climate-resilient crops
                sourced directly from Ugandan farmers.
              </p>
            </div>
            <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="text-5xl mb-6">🧪</div>
              <h3 className="font-bold text-xl mb-4">Biotechnology</h3>
              <p className="text-gray-600 leading-8">
                Modern food science improves digestibility,
                nutritional value and food safety.
              </p>
            </div>
            <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="text-5xl mb-6">🥣</div>
              <h3 className="font-bold text-xl mb-4">Fermentation</h3>
              <p className="text-gray-600 leading-8">
                Controlled fermentation naturally enhances
                probiotics, improves taste and extends shelf life.
              </p>
            </div>
            <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="text-5xl mb-6">❤️</div>
              <h3 className="font-bold text-xl mb-4">Better Health</h3>
              <p className="text-gray-600 leading-8">
                Affordable nutritious foods designed for
                children, families and lactose-intolerant consumers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          PRODUCTS
      ======================================================= */}
      <section className="bg-green-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-green-700 font-semibold">OUR PRODUCTS</p>
            <h2 className="text-4xl font-bold">Innovation Designed for Better Nutrition</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Current Product</h3>
              <ul className="space-y-4 text-gray-700">
                <li>✓ Plant-based fermented probiotic yogurt alternative</li>
                <li>✓ Dairy-free</li>
                <li>✓ Lactose-free</li>
                <li>✓ Live probiotics</li>
                <li>✓ Affordable production</li>
                <li>✓ Locally sourced ingredients</li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Future Innovation Pipeline</h3>
              <ul className="space-y-4 text-gray-700">
                <li>✓ Functional nutrition powders</li>
                <li>✓ School feeding products</li>
                <li>✓ Therapeutic nutrition formulations</li>
                <li>✓ Community fermentation starter kits</li>
                <li>✓ Functional beverages</li>
                <li>✓ Clinical nutrition products</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          COMPETITIVE ADVANTAGE
      ======================================================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-green-700 font-semibold">WHY CHOOSE AVIYO</p>
            <h2 className="text-4xl font-bold">Our Competitive Advantage</h2>
          </div>
          <div className="overflow-x-auto rounded-3xl shadow-lg">
            <table className="w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="text-left p-5">Feature</th>
                  <th className="p-5">Aviyo</th>
                  <th className="p-5">Traditional Products</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b">
                  <td className="p-5 font-semibold">Plant-Based</td>
                  <td className="text-center text-green-700 font-bold">✓</td>
                  <td className="text-center">✕</td>
                </tr>
                <tr className="border-b">
                  <td className="p-5 font-semibold">Lactose-Free</td>
                  <td className="text-center text-green-700 font-bold">✓</td>
                  <td className="text-center">✕</td>
                </tr>
                <tr className="border-b">
                  <td className="p-5 font-semibold">Locally Produced</td>
                  <td className="text-center text-green-700 font-bold">✓</td>
                  <td className="text-center">Mostly Imported</td>
                </tr>
                <tr className="border-b">
                  <td className="p-5 font-semibold">Affordable</td>
                  <td className="text-center text-green-700 font-bold">✓</td>
                  <td className="text-center">Higher Cost</td>
                </tr>
                <tr>
                  <td className="p-5 font-semibold">Supports Local Farmers</td>
                  <td className="text-center text-green-700 font-bold">✓</td>
                  <td className="text-center">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =======================================================
          BUSINESS TIMELINE
      ======================================================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-green-700 font-semibold">OUR JOURNEY</p>
            <h2 className="text-4xl font-bold">Growth Roadmap</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              "2025\nFounded",
              "Prototype\nDevelopment",
              "Certification\n& Funding",
              "Commercial\nProduction",
              "Regional\nExpansion",
            ].map((step) => (
              <div
                key={step}
                className="bg-white rounded-2xl shadow-md p-8 text-center"
              >
                <div className="text-5xl mb-5">🚀</div>
                <p className="font-semibold whitespace-pre-line">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================
          CORE VALUES
      ======================================================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-green-700 font-semibold">OUR VALUES</p>
            <h2 className="text-4xl font-bold">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-8">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* =======================================================
          CALL TO ACTION
      ======================================================= */}
      <section className="bg-gradient-to-r from-green-700 to-emerald-600 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Join Us in Building a Healthier Future
          </h2>
          <p className="mt-6 text-lg text-green-50 max-w-3xl mx-auto">
            Whether you're an investor, a partner, a health professional,
            a farmer, or a customer — we welcome you to be part of this journey.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <Link
              href="/contact"
              className="bg-white text-green-700 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Get in Touch
            </Link>
            <Link
              href="/invest"
              className="border border-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Invest in Aviyo
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}