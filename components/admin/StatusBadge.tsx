// components/admin/StatusBadge.tsx
interface StatusBadgeProps {
  status: string
  className?: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Blog/Product statuses
  published: { label: 'Published', className: 'bg-green-100 text-green-700' },
  draft: { label: 'Draft', className: 'bg-yellow-100 text-yellow-700' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-700' },
  
  // Contact statuses
  new: { label: 'New', className: 'bg-blue-100 text-blue-700' },
  read: { label: 'Read', className: 'bg-yellow-100 text-yellow-700' },
  replied: { label: 'Replied', className: 'bg-green-100 text-green-700' },
  
  // Farmer statuses
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
  
  // Generic
  active: { label: 'Active', className: 'bg-green-100 text-green-700' },
  inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-700' },
  in_stock: { label: 'In Stock', className: 'bg-green-100 text-green-700' },
  out_of_stock: { label: 'Out of Stock', className: 'bg-red-100 text-red-700' },
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-700' }
  
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.className} ${className}`}>
      {config.label}
    </span>
  )
}