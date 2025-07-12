import root from '../../core/AbstractField';

describe('AbstractField', () => {
  describe('F class', () => {
    it('should create a field with default values', () => {
      const field = new (root.constructor as any)();
      expect(field.v).toBe(0);
      expect(field.c).toEqual([]);
      expect(typeof field.t).toBe('function');
    });

    it('should create a field with custom values', () => {
      const customTransform = (p: any, _c: any[]) => p;
      const field = new (root.constructor as any)(42, [], customTransform);
      expect(field.v).toBe(42);
      expect(field.c).toEqual([]);
      expect(field.t).toBe(customTransform);
    });

    it('should evaluate with default transform when no children', () => {
      const field = new (root.constructor as any)(5);
      expect(field.e()).toBe(5);
    });

    it('should evaluate with children using default transform', () => {
      const child1 = new (root.constructor as any)(3);
      const child2 = new (root.constructor as any)(7);
      const field = new (root.constructor as any)(0, [child1, child2]);
      expect(field.e()).toBe(10); // 3 + 7
    });

    it('should add child field', () => {
      const field = new (root.constructor as any)();
      const child = new (root.constructor as any)(5);
      field.a(child);
      expect(field.c).toContain(child);
      expect(field.c.length).toBe(1);
    });

    it('should modify transform', () => {
      const field = new (root.constructor as any)(2);
      const newTransform = (p: any, _c: any[]) => p * 2;
      field.m(newTransform);
      expect(field.t).toBe(newTransform);
      expect(field.e()).toBe(4); // 2 * 2
    });

    it('should set value', () => {
      const field = new (root.constructor as any)(1);
      field.s(10);
      expect(field.v).toBe(10);
      expect(field.e()).toBe(10);
    });

    it('should handle nested evaluation', () => {
      const grandchild = new (root.constructor as any)(2);
      const child = new (root.constructor as any)(0, [grandchild]);
      const field = new (root.constructor as any)(0, [child]);
      expect(field.e()).toBe(2); // grandchild value
    });

    it('should handle array values', () => {
      const field = new (root.constructor as any)([1, 2, 3]);
      expect(field.v).toEqual([1, 2, 3]);
    });

    it('should allow adding children to a new field', () => {
      const field = new (root.constructor as any)(1);
      const child = new (root.constructor as any)(5);
      field.a(child);
      expect(field.c).toContain(child);
      expect(field.e()).toBe(5); // Only the child's value is summed
    });
  });

  describe('root export', () => {
    it('should export a field instance', () => {
      expect(root).toBeDefined();
      expect(root.v).toBe(1);
      expect(Array.isArray(root.c)).toBe(true);
      expect(typeof root.t).toBe('function');
    });

    it('should evaluate root field', () => {
      expect(root.e()).toBe(1);
    });
  });
}); 