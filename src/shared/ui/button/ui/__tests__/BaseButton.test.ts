import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../BaseButton.vue';

describe('BaseButton', () => {
  it('should render button with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.classes()).not.toContain('danger');
  });

  it('should apply danger variant class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'danger',
      },
      slots: {
        default: 'Delete',
      },
    });

    expect(wrapper.classes()).toContain('danger');
  });

  it('should emit click event', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('disabled');
  });

  it('should not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('should render slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: '<span class="icon">🚀</span> Launch',
      },
    });

    expect(wrapper.html()).toContain('🚀');
    expect(wrapper.html()).toContain('Launch');
  });

  it('should have default variant when not specified', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Default',
      },
    });

    expect(wrapper.classes()).not.toContain('danger');
  });
});
