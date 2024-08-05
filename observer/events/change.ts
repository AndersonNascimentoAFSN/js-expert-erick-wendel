import { IData, ISubject } from '../subjects/subject'

export class Change {
  private subject: ISubject

  constructor(subject: ISubject) {
    this.subject = subject
  }

  update(data: IData) {
    this.subject.notify(data)
  }
}
