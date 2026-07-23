// components/ui/WhyAviyo.tsx
const features = [
  {
    icon: '🥛',
    title: 'Lactose-Free',
    description: 'Safe for the 60% of Ugandans with lactose intolerance. No more stomach discomfort.',
  },
  {
    icon: '🌱',
    title: '100% Local',
    description: 'Made from Ugandan-grown soybeans, cassava, and grains. Supporting local farmers.',
  },
  {
    icon: '🧪',
    title: 'Enzyme-Enhanced',
    description: 'Better digestion and nutrient absorption through our proprietary enzyme processing.',
  },
  {
    icon: '♻️',
    title: 'Sustainable',
    description: 'Supporting circular economy, reducing waste, and building a greener Uganda.',
  },
  {
    icon: '💰',
    title: 'Affordable',
    description: 'Quality nutrition at prices every Ugandan family can afford. No compromises.',
  },
  {
    icon: '❤️',
    title: 'Made with Love',
    description: 'Every product is crafted with care for our community and our planet.',
  },
]

export default function WhyAviyo() {
  return (
    <section className="py-16 bg-primary-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
            Why Aviyo?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're on a mission to make plant-based nutrition accessible to every Ugandan
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}