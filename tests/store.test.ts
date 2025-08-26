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
  it('appends message content', () => {
    useStore
      .getState()
      .addMessage({ id: 'm1', role: 'assistant', content: 'He', ts: 0, targetId: 't' })
    useStore.getState().appendMessage('t', 'm1', 'llo')
    expect(useStore.getState().messages['t'][0].content).toBe('Hello')
  })
})
