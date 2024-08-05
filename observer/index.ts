import { Change } from './events/change'
import { Status } from './observers/status'
import { Subject } from './subjects/subject'

export function filterObservation(companyStatus: string) {
  const subject = new Subject()

  const status = new Status()

  subject.subscribe(status)

  const filter = new Change(subject)

  filter.update({ label: 'status', value: companyStatus })
}
