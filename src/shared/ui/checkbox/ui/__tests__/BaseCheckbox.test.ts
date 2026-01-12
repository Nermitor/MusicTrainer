import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseCheckbox from '../BaseCheckbox.vue';

describe('BaseCheckbox', () => {
  it('should render checkbox with label', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        default: 'Accept terms',
      },
    });

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Accept terms');
  });

  it('should be checked when modelValue is true', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: true,
      },
      slots: {
        default: 'Checked',
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"]').element as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should be unchecked when modelValue is false', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        default: 'Unchecked',
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"]').element as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('should emit update:modelValue on change', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        default: 'Toggle me',
      },
    });

    await wrapper.find('input[type="checkbox"]').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('should toggle value on click', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
      slots: {
        default: 'Toggle',
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true);

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
        disabled: true,
      },
      slots: {
        default: 'Disabled checkbox',
      },
    });

    expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('disabled');
  });

  it('should not emit update:modelValue when disabled', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });

    await wrapper.find('input[type="checkbox"]').trigger('change');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('should render icon when checked', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: true,
      },
      slots: {
        default: 'With icon',
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"]').element as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
