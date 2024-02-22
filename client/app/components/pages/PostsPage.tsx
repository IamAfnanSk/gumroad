import * as React from 'react'
import { DashboardPageLayout } from '@/components/layouts/DashboardPageLayout'
import { Creator } from '@/types'

type Props = {
  creator?: Partial<Creator>
}

const PostsPage = ({ creator }: Props) => {
  return (
    <DashboardPageLayout title="Posts" creator={creator}>
      <div className="dashboard-container">
        <p className="text-2xl text-center">WIP 🚧</p>
      </div>
    </DashboardPageLayout>
  )
}

export { PostsPage }
