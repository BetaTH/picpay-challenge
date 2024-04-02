export interface UnitOfWork {
  runInTransaction<R>(fn: () => Promise<R>): Promise<R>
}
