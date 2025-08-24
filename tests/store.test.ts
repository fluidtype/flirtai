import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../src/lib/store'

describe('store', () => {
  beforeEach(() => {
    useStore.setState({ user: null, targets: [], messages: {}, ui: {} })
  })
  it('adds target', () => {
    useStore
      .getState()
      .addTarget({ id: '1', name: 'A', age: 20, followers: 100, job: 'Dev', createdAt: 0 })
    expect(useStore.getState().targets).toHaveLength(1)
  })
})
