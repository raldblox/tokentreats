import React from 'react'

const page = () => {
    const features = [
        {
            title: "Personalized Rewards",
            desc: "Members can handpick their preferred reward tokens, whether fungible or non-fungible, resulting in a unique loyalty experience."
        },
        {
            title: "Seamless Fungible Swaps",
            desc: "Convert treats into chosen tokens using Uniswapv3 with ease, ensuring a hassle-free redemption process."
        },
        {
            title: "Recipient's Choice",
            desc: "Directly receive preferred rewards by providing token contract addresses, ensuring you get exactly what you want."
        },
        {
            title: "Effortless Treat Sending",
            desc: "Easily send treats to loyal members by specifying their recipient address and adding a personalized message."
        },
        {
            title: "Impact Insights",
            desc: "Empower users with real-time data insights on their actions, preferred token types, and favored cryptocurrencies."
        },
        {
            title: "Ethereum Attestation Service",
            desc: "Verify authenticity and user interest in receiving treats, enhancing the effectiveness of loyalty tracking."
        },
        {
            title: "WorldCoin's Identity Tool",
            desc: "Seamlessly integrate the WorldCoin identity system to establish secure digital IDs for users, ensuring privacy and validation."
        },
        {
            title: "User-Centric Experience",
            desc: "Deliver a user-centric approach across diverse blockchains, ensuring that loyalty feels natural and enjoyable."
        }
    ];
    const problems = [
        {
            title: "Lack of Personalization",
            desc: "Traditional loyalty programs lack personalization and often lead to unused rewards."
        },
        {
            title: "Ineffective Member Engagement",
            desc: "Businesses struggle to engage loyal members effectively due to outdated loyalty systems."
        },
        {
            title: "Fragmented Reward Systems",
            desc: "Fragmented reward systems across various platforms make it challenging for users to manage and redeem rewards efficiently."
        },
        {
            title: "Limited Reward Options",
            desc: "Limited reward options in many loyalty programs don't align with the diverse preferences of users."
        },
        {
            title: "Complex Reward Redemption",
            desc: "Users face complexities when trying to redeem rewards due to convoluted processes and unclear instructions."
        },
        {
            title: "Reduced User Engagement",
            desc: "Lack of user engagement in traditional loyalty systems leads to reduced participation and interest."
        },
        {
            title: "Difficulty in Assessing Impact",
            desc: "Businesses struggle to quantify the impact of their loyalty programs, making it hard to assess success and areas for improvement."
        },
        {
            title: "Authenticity and Fraud Concerns",
            desc: "Ensuring the authenticity of loyal members and preventing fraud in loyalty programs is a persistent challenge."
        },
        {
            title: "Privacy and Data Security",
            desc: "Privacy concerns and data breaches make users hesitant to provide personal information for loyalty programs."
        },
        {
            title: "Complex Integration",
            desc: "Integrating blockchain technology into loyalty programs can be complex and resource-intensive for businesses."
        },
        {
            title: "Liquidity and Value Exchange",
            desc: "Users may receive rewards in tokens with limited liquidity, hindering their ability to easily exchange them for value."
        },
        {
            title: "High Fees and Barriers",
            desc: "Some loyalty programs have high transaction fees or complex procedures for redeeming rewards, discouraging user participation."
        }
    ];

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="lg:max-w-[50%] space-y-3">
                    <h3 className="text-green-960 text-xl uppercase font-bold">
                        TokenTreats
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-5xl">
                        Redefining Loyalty with Personalized Blockchain Rewards
                    </p>
                    <p className='text-base'>
                        Tokentreats truly redefine loyalty, amplify impact, and co-create a world where blockchain-driven rewards are designed for businesses, communities, enterprises, and the enthusiastic users who make them truly meaningful. With TokenTreats, loyalty is not just a program; it's a dynamic and personalized experience that enriches the bond between organizations and their valued members.
                    </p>
                </div>
                <div className="mt-12">
                    <h3 className="text-green-960 text-xl uppercase font-bold mb-10">
                        The Problems we are trying to solve
                    </h3>
                    <ul className="grid gap-y-8 gap-x-5 sm:grid-cols-1 lg:grid-cols-3">
                        {
                            problems.map((item, idx) => (
                                <li key={idx} className="space-y-3">
                                    <h4 className="text-xl text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p className='max-w-lg'>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="mt-12">
                    <h3 className="text-green-960 text-xl uppercase font-bold mb-10">
                        OUR SOLUTION
                    </h3>
                    <h1 className='text-5xl'>TokenTreats!</h1>
                </div>
                <div className="mt-12">
                    <h3 className="text-green-960 text-xl uppercase font-bold mb-10">
                        TokenTreats Features
                    </h3>
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-1 lg:grid-cols-2">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="space-y-3">
                                    <h4 className="text-3xl text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p className='max-w-lg'>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default page