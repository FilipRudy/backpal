import { User } from "/tmp/user.entity.ts";
import 'reflect-metadata';
import { getMetadataArgsStorage } from 'typeorm';

describe('User Entity', () => {

  describe('Field Existence', () => {
    it('should have all fields defined', () => {
      const user = new User();

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });

  describe('Column Types', () => {
    it('should have correct types for columns', () => {
      const entityMetadata = getMetadataArgsStorage().filterColumns(User);

      const idColumn = entityMetadata.find(col => col.propertyName === 'id');
      const nameColumn = entityMetadata.find(col => col.propertyName === 'name');
      const emailColumn = entityMetadata.find(col => col.propertyName === 'email');

      expect(idColumn.options.type).toBe(Number);

      expect(nameColumn.options.type).toBe(String);

      expect(emailColumn.options.type).toBe(String);
    });
  });

  describe('Column Decorators', () => {
    it('should have correct decorators applied to columns', () => {
      const entityMetadata = getMetadataArgsStorage().filterColumns(User);

      const idColumn = entityMetadata.find(col => col.propertyName === 'id');
      const emailColumn = entityMetadata.find(col => col.propertyName === 'email');

      expect(idColumn.options.primary).toBe(true);  

      expect(emailColumn.options.unique).toBe(true); 
    });
  });

});
