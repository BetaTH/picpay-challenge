import { UnitOfWork } from '@/core/unit-of-work/unit-of-work'

export class InMemoryUnityOfWork implements UnitOfWork {
  async runInTransaction<R>(fn: () => Promise<R>): Promise<R> {
    return await fn()
  }
}
