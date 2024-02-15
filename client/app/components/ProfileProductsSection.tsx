import * as React from 'react'
import { ProfileSectionPositionMover } from '@/components/ProfileSectionPositionMover'
import { Section } from '@/types'
import { FaStar } from 'react-icons/fa6'

type Props = {
  section: Section
}

const ProfileProductsSection = ({ section }: Props) => {
  return (
    <div className="border-t border-border w-full relative">
      <div className="profile-container">
        {section.show_title && <h2 className="text-2xl">{section.title}</h2>}

        <div className="flex"></div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-5">
          {section.products.map((product) => {
            return (
              <div className="border border-border rounded" key={product.id}>
                <div className="aspect-w-3 aspect-h-3">
                  <img
                    src={
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjMjNBMDk0IiBkPSJNMCAwaDIwMHYyMDBIMHoiLz48cGF0aCBkPSJNMjMuNjM3IDUyLjI4OHYtMTMuMjhjMC0zLjczNCAxLjQ2My03LjMxOCA0LjA3MS05Ljk2MmExMy44MyAxMy44MyAwIDAgMSA5Ljg0Ny00LjEzNGgxMzIuMzIxYTEzLjgzIDEzLjgzIDAgMCAxIDkuODQ3IDQuMTM0IDE0LjE5IDE0LjE5IDAgMCAxIDQuMDcxIDkuOTYydjEzLjI4YzAgMi43MjktLjc4MSA1LjQtMi4yNTEgNy42ODhhMTMuOTg0IDEzLjk4NCAwIDAgMS01LjM5MSA0Ljg5NXY4Ni43NzhjMCAxLjg0OS0uMzU5IDMuNjgtMS4wNTggNS4zODlhMTQuMTIxIDE0LjEyMSAwIDAgMS0zLjAxMyA0LjU3MyAxMy45MDcgMTMuOTA3IDAgMCAxLTQuNTE2IDMuMDU4IDEzLjc1OSAxMy43NTkgMCAwIDEtNS4zMzEgMS4wNzVoLTM4LjAzNWExOC44OTQgMTguODk0IDAgMCAxLTYuNTY4IDYuNjczIDE4LjU4IDE4LjU4IDAgMCAxLTkuNTggMi42NzFoLTguNjc0YTE4LjU2NyAxOC41NjcgMCAwIDEtOS41NzgtMi42NzEgMTguODc4IDE4Ljg3OCAwIDAgMS02LjU2Mi02LjY3M0g0NS4xOTNhMTMuODMgMTMuODMgMCAwIDEtOS44NDctNC4xMzMgMTQuMTkgMTQuMTkgMCAwIDEtNC4wNzEtOS45NjJ2LTkuMTE4Yy0uMzc3LjAzMy0uNzU2LjA1LTEuMTM1LjA1MWgtLjAwNGExMy44MDYgMTMuODA2IDAgMCAxLTguNDExLTIuODU1IDE0LjEwNCAxNC4xMDQgMCAwIDEtNC45OTYtNy40MTJjLS44MjMtMi45NTQtLjY3Mi02LjEuNDMxLTguOTU5YTE0LjA1IDE0LjA1IDAgMCAxIDUuNjg1LTYuODg0bC43OTItNjQuMTg0Wm0wIDBjMCAyLjcyNy43ODIgNS4zOTcgMi4yNSA3LjY4NGExMy45OCAxMy45OCAwIDAgMCA1LjM4OCA0Ljg5NG0tNy42MzgtMTIuNTc4IDcuNjM4IDEyLjU3OG0wIDB2NDYuMzU0bC04LjQyOCA1LjI1MSA4LjQyOC01MS42MDVaIiBmaWxsPSIjMjNBMDk0IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMi4xNzYiLz48cGF0aCBkPSJNMTcyLjQzMSA0MC4xMjdWNTMuMThIMzUuMjc0VjQwLjEyN0gxNzIuNDNabS02Ny43NDMgNjIuNzI0IDIyLjY0NyAyMy4wMTJjLTYuMjY3IDUuOTIxLTE0LjcwNiA5LjIzNC0yMy40OTQgOS4yMjF2LTMyLjIzM2guODQ3WiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xNjQuNTA5IDUzLjE4djk3LjYzOEg0My4xOTFWNTMuMTc5IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMi4xNzYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00My4xOTEgNTMuMThoLTcuOTE3VjQwLjEyN0gxNzIuNDNWNTMuMThINDMuMTkxWm03MC4xOSA5Ny42Mzh2NC4zNjNhNC43MjYgNC43MjYgMCAwIDEtMS40NjkgMy40MDggNS4xMTYgNS4xMTYgMCAwIDEtMy41NDUgMS40MTJoLTguOTlhNS4xOSA1LjE5IDAgMCAxLTEuOTE4LS4zNjcgNS4wMTYgNS4wMTYgMCAwIDEtMS42MjUtMS4wNDUgNC44IDQuOCAwIDAgMS0xLjA4Ni0xLjU2NCA0LjY1IDQuNjUgMCAwIDEtLjM4LTEuODQ0di00LjM2M200My4wMjUtNDcuOTY3YzAtOC41NTMtMy41MzQtMTYuNzU0LTkuODI0LTIyLjgwMi02LjI5MS02LjA0Ny0xNC44MjMtOS40NDUtMjMuNzE5LTkuNDQ1cy0xNy40MjggMy4zOTgtMjMuNzE5IDkuNDQ1Yy02LjI5IDYuMDQ3LTkuODI0IDE0LjI1LTkuODI0IDIyLjgwMnYuMDNjLjAwNCA4LjU1MiAzLjU0MiAxNi43NTIgOS44MzUgMjIuNzk3IDYuMjk0IDYuMDQ0IDE0LjgyNyA5LjQzOCAyMy43MjQgOS40MzQgOC44OTYtLjAwNCAxNy40MjYtMy40MDUgMjMuNzE0LTkuNDU1IDYuMjg3LTYuMDUgOS44MTgtMTQuMjU0IDkuODEzLTIyLjgwNnYwWk0xMDMuODUgNzAuNjA0djY0LjM3OG0zMy41NDMtMzIuMTMxSDEwMy44NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIuMTc2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJtMTI3LjMzNSAxMjUuODc1LTIyLjY0Ny0yMy4wMjQtLjgzOC0uODUzbS03Ni4yOCAyNi4wNTkgMTUuNjIxLTkuMiAyNy4xMTYtMTUuOTc2IDE1LjMyOC05LjAzbTYuNDk1LTEuODQ1YTMuMTQ5IDMuMTQ5IDAgMCAwLS41NjktMS43OTQgMy4zMzQgMy4zMzQgMCAwIDAtMS41MDktMS4xODggMy40ODUgMy40ODUgMCAwIDAtMS45NC0uMTgyIDMuNDA0IDMuNDA0IDAgMCAwLTEuNzIuODg1IDMuMTk0IDMuMTk0IDAgMCAwLS45MTggMS42NTQgMy4xMTUgMy4xMTUgMCAwIDAgLjE5MSAxLjg2NiAzLjI3IDMuMjcgMCAwIDAgMS4yMzggMS40NDkgMy40NzcgMy40NzcgMCAwIDAgMy4xNTMuMjk4IDMuMzcyIDMuMzcyIDAgMCAwIDEuMDktLjcwMmMuMzEzLS4zLjU2LS42NTcuNzI5LTEuMDQ5LjE2OC0uMzkyLjI1NS0uODEzLjI1NC0xLjIzN1pNNTIuNTQ0IDYxLjgwOUg4NS40MW0tMzIuODY2IDcuNjU4aDE5LjIzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMi4xNzYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=='
                    }
                    className="w-full h-hull object-cover"
                    alt={product.name}
                  />
                </div>
                <div className="border-b px-5 py-4 border-border">
                  <p className="text-xl">{product.name}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 px-5 flex items-center gap-2">
                    <FaStar />
                    <p>No ratings</p>
                  </div>
                  <div className="py-4 px-5 border-l border-border">
                    ${product.price}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ProfileSectionPositionMover
        sectionId={section.id}
        position={section.position}
      />
    </div>
  )
}

export { ProfileProductsSection }
