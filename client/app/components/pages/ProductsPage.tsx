import * as React from 'react'
import { DashboardPageLayout } from '@/components/layouts/DashboardPageLayout'
import { Creator } from '@/types'

type Props = {
  creator?: Partial<Creator>
}

const ProductsPage = ({ creator }: Props) => {
  return (
    <DashboardPageLayout title="Products" creator={creator}>
      <div className="dashboard-container">
        <p className="text-2xl text-center">WIP 🚧</p>
      </div>
    </DashboardPageLayout>
  )
}

export { ProductsPage }
