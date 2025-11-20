import { Check, Sparkles, Building2, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Pricing = () => {
    const navigate = useNavigate();

    const handleContactSales = (planName: string) => {
        const subject = `[n8n datasight] Inquiry about DataSight ${planName} Plan`;
        const body = `Hello DataSight Team,

I am interested in learning more about the ${planName} plan for DataSight.

Please provide me with additional information regarding:
- Pricing details
- Features and capabilities
- Implementation timeline
- Support options

I would appreciate the opportunity to discuss how DataSight can help meet our data analysis needs.

Best regards`;

        const mailtoLink = `mailto:devlewiso@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for individuals - Full v2 features',
            icon: Sparkles,
            features: [
                '✨ AI Chat Assistant (NEW)',
                'Use your own OpenAI API key',
                'Unlimited file uploads',
                'Advanced data analysis',
                'Interactive visualizations',
                'API key auto-deleted on close',
                'Community support',
                'Export results'
            ],
            cta: 'Get Started Free',
            popular: false,
            action: () => navigate('/analyze')
        },
        {
            name: 'Starter',
            price: 'Contact Sales',
            period: '',
            description: 'For small teams and startups',
            icon: Building2,
            features: [
                'Everything in Free',
                'No API key needed (we provide)',
                'Custom bot prompts',
                'Priority support',
                'Up to 5 team members',
                'Advanced analytics',
                'Data export in multiple formats'
            ],
            cta: 'Contact Sales',
            popular: true,
            action: () => handleContactSales('Starter')
        },
        {
            name: 'Professional',
            price: 'Contact Sales',
            period: '',
            description: 'For growing businesses',
            icon: Crown,
            features: [
                'Everything in Starter',
                'Custom solutions per use case',
                'Dedicated account manager',
                'Up to 20 team members',
                'API access',
                'White-label options',
                'Custom integrations',
                'SLA guarantee'
            ],
            cta: 'Contact Sales',
            popular: false,
            action: () => handleContactSales('Professional')
        },
        {
            name: 'Enterprise',
            price: 'Contact Sales',
            period: '',
            description: 'For large organizations',
            icon: Crown,
            features: [
                'Everything in Professional',
                'Unlimited team members',
                'On-premise deployment',
                'Custom AI model training',
                'Dedicated infrastructure',
                'Advanced security features',
                '24/7 premium support',
                'Custom contract terms'
            ],
            cta: 'Contact Sales',
            popular: false,
            action: () => handleContactSales('Enterprise')
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-blue-900/50 text-blue-200 rounded-full text-sm font-semibold mb-4">
                        ✨ DataSight v2 Pricing
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-2">
                        Start free with full v2 features using your own API key. Upgrade for enterprise solutions.
                    </p>
                    <p className="text-blue-400 text-sm max-w-2xl mx-auto">
                        🔒 Your API key is stored locally and deleted automatically when you close the page
                    </p>
                    <button
                        onClick={() => navigate('/pricing')}
                        className="mt-6 text-blue-400 hover:text-blue-300 transition-colors underline"
                    >
                        View detailed pricing comparison →
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={index}
                                className={`relative rounded-2xl p-8 ${plan.popular
                                    ? 'bg-gradient-to-b from-blue-600 to-blue-700 ring-2 ring-blue-400'
                                    : 'bg-gray-800 border border-gray-700'
                                    } hover:scale-105 transition-transform duration-300`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <Icon className={`w-10 h-10 mb-4 ${plan.popular ? 'text-white' : 'text-blue-400'}`} />
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        {plan.price !== 'Custom' && (
                                            <span className={`ml-2 ${plan.popular ? 'text-blue-100' : 'text-gray-400'}`}>
                                                /{plan.period}
                                            </span>
                                        )}
                                    </div>
                                    {plan.price === 'Custom' && (
                                        <span className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-400'}`}>
                                            {plan.period}
                                        </span>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-blue-200' : 'text-blue-400'
                                                }`} />
                                            <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-300'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={plan.action}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${plan.popular
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

                {/* Footer Note */}
                <div className="text-center mt-12">
                    <p className="text-gray-400 text-sm">
                        All corporate plans include a 14-day free trial. No credit card required.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        Powered by{' '}
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
        </section>
    );
};
