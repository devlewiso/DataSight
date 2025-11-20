import React from 'react';
import { Check, X, ArrowLeft, Sparkles, Building2, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PricingPage: React.FC = () => {
    const navigate = useNavigate();

    const features = [
        { name: 'File uploads', free: 'Unlimited', starter: 'Unlimited', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'OpenAI API', free: 'Your own key', starter: 'Included', pro: 'Included', enterprise: 'Included' },
        { name: 'Data analysis', free: true, starter: true, pro: true, enterprise: true },
        { name: 'AI chatbot', free: true, starter: true, pro: true, enterprise: true },
        { name: 'Team members', free: '1', starter: 'Up to 5', pro: 'Up to 20', enterprise: 'Unlimited' },
        { name: 'Custom bot prompts', free: false, starter: true, pro: true, enterprise: true },
        { name: 'Priority support', free: false, starter: true, pro: true, enterprise: true },
        { name: 'Advanced analytics', free: false, starter: true, pro: true, enterprise: true },
        { name: 'Custom solutions', free: false, starter: false, pro: true, enterprise: true },
        { name: 'Dedicated account manager', free: false, starter: false, pro: true, enterprise: true },
        { name: 'API access', free: false, starter: false, pro: true, enterprise: true },
        { name: 'White-label options', free: false, starter: false, pro: true, enterprise: true },
        { name: 'On-premise deployment', free: false, starter: false, pro: false, enterprise: true },
        { name: 'Custom AI training', free: false, starter: false, pro: false, enterprise: true },
        { name: 'SLA guarantee', free: false, starter: false, pro: true, enterprise: true },
        { name: '24/7 premium support', free: false, starter: false, pro: false, enterprise: true },
    ];

    const faqs = [
        {
            question: '¿Puedo cambiar de plan en cualquier momento?',
            answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejarán en tu próximo ciclo de facturación.'
        },
        {
            question: '¿Qué incluye la personalización de bots?',
            answer: 'Puedes personalizar los prompts del chatbot para que se adapte a tu caso de uso específico, incluyendo terminología de tu industria, tono de voz, y reglas de negocio personalizadas.'
        },
        {
            question: '¿Cómo funcionan las soluciones personalizadas?',
            answer: 'Nuestro equipo trabaja contigo para entender tus necesidades específicas y crear soluciones de análisis de datos adaptadas a tu caso de uso, incluyendo integraciones personalizadas y flujos de trabajo específicos.'
        },
        {
            question: '¿Mis datos están seguros?',
            answer: 'Absolutamente. En el plan Free, todo se procesa en tu navegador. En los planes corporativos, usamos encriptación de extremo a extremo y cumplimos con GDPR y otras regulaciones de privacidad.'
        },
        {
            question: '¿Ofrecen descuentos para ONGs o educación?',
            answer: 'Sí, ofrecemos descuentos especiales para organizaciones sin fines de lucro e instituciones educativas. Contáctanos para más información.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver al inicio
                </button>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">
                        Planes y Precios
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Elige el plan perfecto para tus necesidades. Todos los planes corporativos incluyen 14 días de prueba gratuita.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {[
                        {
                            name: 'Free',
                            price: '$0',
                            period: 'forever',
                            icon: Sparkles,
                            description: 'Perfecto para empezar',
                            cta: 'Comenzar Gratis',
                            action: () => navigate('/analyze')
                        },
                        {
                            name: 'Starter',
                            price: '$49',
                            period: 'mes',
                            icon: Building2,
                            description: 'Para equipos pequeños',
                            cta: 'Probar Gratis',
                            popular: true,
                            action: () => window.open('https://neuralcodelab.com/contact', '_blank')
                        },
                        {
                            name: 'Professional',
                            price: '$149',
                            period: 'mes',
                            icon: Crown,
                            description: 'Para empresas en crecimiento',
                            cta: 'Contactar Ventas',
                            action: () => window.open('https://neuralcodelab.com/contact', '_blank')
                        },
                        {
                            name: 'Enterprise',
                            price: 'Personalizado',
                            period: '',
                            icon: Crown,
                            description: 'Para grandes organizaciones',
                            cta: 'Contactar Ventas',
                            action: () => window.open('https://neuralcodelab.com/contact', '_blank')
                        }
                    ].map((plan, idx) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={idx}
                                className={`relative rounded-xl p-6 ${plan.popular
                                        ? 'bg-gradient-to-b from-blue-600 to-blue-700 ring-2 ring-blue-400'
                                        : 'bg-gray-800 border border-gray-700'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Más Popular
                                    </div>
                                )}
                                <Icon className={`w-8 h-8 mb-3 ${plan.popular ? 'text-white' : 'text-blue-400'}`} />
                                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                <p className={`text-sm mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {plan.description}
                                </p>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    {plan.period && <span className="text-gray-400">/{plan.period}</span>}
                                </div>
                                <button
                                    onClick={plan.action}
                                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${plan.popular
                                            ? 'bg-white text-blue-600 hover:bg-blue-50'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Feature Comparison Table */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Comparación Detallada</h2>
                    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-900">
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Característica</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Free</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold bg-blue-900/30">Starter</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Professional</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature, idx) => (
                                        <tr key={idx} className="border-t border-gray-700">
                                            <td className="px-6 py-4 text-sm">{feature.name}</td>
                                            {['free', 'starter', 'pro', 'enterprise'].map((plan) => (
                                                <td
                                                    key={plan}
                                                    className={`px-6 py-4 text-center ${plan === 'starter' ? 'bg-blue-900/10' : ''}`}
                                                >
                                                    {typeof feature[plan as keyof typeof feature] === 'boolean' ? (
                                                        feature[plan as keyof typeof feature] ? (
                                                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                        ) : (
                                                            <X className="w-5 h-5 text-gray-600 mx-auto" />
                                                        )
                                                    ) : (
                                                        <span className="text-sm text-gray-300">{feature[plan as keyof typeof feature]}</span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                <p className="text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 mb-8">
                    <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Únete a cientos de empresas que ya están transformando sus datos en insights accionables.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/analyze')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                        >
                            Probar Gratis
                        </button>
                        <button
                            onClick={() => window.open('https://neuralcodelab.com/contact', '_blank')}
                            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all border border-blue-400"
                        >
                            Contactar Ventas
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-500 text-sm">
                    <p>
                        Desarrollado por{' '}
                        <a
                            href="https://neuralcodelab.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            neuralcodelab.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
