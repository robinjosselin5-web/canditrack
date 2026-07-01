import type { DetailsTab } from '../config/companyDetailsTabs'
import { detailsTabs } from '../config/companyDetailsTabs'

interface CompanyDetailsTabsProps {
  activeTab: DetailsTab
  onChangeTab: (tab: DetailsTab) => void
}

export function CompanyDetailsTabs({
  activeTab,
  onChangeTab,
}: CompanyDetailsTabsProps) {
  return (
    <div className="overflow-x-auto border-b border-border">
      <div className="flex min-w-max gap-2">
        {detailsTabs.map((tab) => (
          <button
            key={tab.key}
            className={[
              'inline-flex min-h-12 cursor-pointer items-center gap-2 border-b-2 px-4 text-sm font-semibold transition',
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary',
            ].join(' ')}
            onClick={() => onChangeTab(tab.key)}
            type="button"
          >
            <tab.icon className="size-4" aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
