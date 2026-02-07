export function FeatureCard({ title, description }: { title: string; description: string }) {
    return <div className="rounded-2xl border border-gray-200 bg-gray-800 p-8 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
}
