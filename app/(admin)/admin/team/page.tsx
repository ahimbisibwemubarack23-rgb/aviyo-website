// app/(admin)/admin/team/page.tsx
import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { FaPlus, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa'

async function getTeamMembers() {
  const { data } = await supabaseAdmin
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })
  return data || []
}

export default async function TeamManagementPage() {
  const members = await getTeamMembers()

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-500">Manage your team members</p>
        </div>
        <Link
          href="/admin/team/new"
          className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors"
        >
          <FaPlus />
          Add Member
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-primary-50 to-cream-50">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-6xl text-gray-300">👤</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <Link
                  href={`/admin/team/${member.id}`}
                  className="bg-white p-1.5 rounded-lg shadow-sm hover:bg-gray-50"
                >
                  <FaEdit className="w-4 h-4 text-blue-500" />
                </Link>
                <button className="bg-white p-1.5 rounded-lg shadow-sm hover:bg-gray-50">
                  <FaTrash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-primary-500">{member.role}</p>
                </div>
                <div className="flex gap-1">
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaArrowUp className="w-3 h-3" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
              {member.bio && (
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{member.bio}</p>
              )}
              {member.social_links && (
                <div className="flex gap-2 mt-3">
                  {Object.entries(member.social_links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      <span className="text-sm">{platform}</span>
                    </a>
                  ))}
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  member.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {member.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500">No team members yet. Add your first team member!</p>
        </div>
      )}
    </div>
  )
}