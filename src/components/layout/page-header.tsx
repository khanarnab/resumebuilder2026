export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) { 
    return <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-gray-900">{title}</h1>{description && <p className="mt-2 text-sm text-gray-600">{description}</p>}</div>{action}</div> }
