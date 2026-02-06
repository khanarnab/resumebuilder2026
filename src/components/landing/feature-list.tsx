import { FeatureCard } from "./feature-card";
export function FeatureList() { 
    return <section className="py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Features</h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard title="Real-time Preview" description="See changes instantly as you type." />
            <FeatureCard title="PDF Export" description="Download as a professional PDF." />
            <FeatureCard title="Auto-Save" description="Never lose your work." />
            </div>
            </section> }
