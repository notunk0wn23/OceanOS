const { File, Directory, FileSystem } = require('../src/modules/FileSystem.js'); // Replace with your file path

describe('FileSystem', () => {
  describe('Directory', () => {
    it('should add child', () => {
      const dir = new Directory('/test');
      const file = new File('/test/file.txt', 'data');
      dir.addChild('file.txt', file);
      expect(dir.getChild('file.txt')).toBe(file);
    });

    it('should throw error for existing child', () => {
      const dir = new Directory('/test');
      const file = new File('/test/file.txt', 'data');
      dir.addChild('file.txt', file);
      expect(() => dir.addChild('file.txt', new File('/test/file2.txt', 'data2'))).toThrowError(/already exists/);
    });
  });

  describe('resolvePath', () => {
    it('should resolve existing path', () => {
      const fs = new FileSystem();
      fs.root.addChild('dir1', new Directory('/dir1'));
      fs.root.getChild('dir1').addChild('file.txt', new File('/dir1/file.txt', 'data'));

      const resolvedFile = fs.resolvePath('/dir1/file.txt');
      expect(resolvedFile).not.toBeNull();
      expect(resolvedFile.path).toBe('/dir1/file.txt');
    });

    it('should return null for non-existent path', () => {
      const fs = new FileSystem();
      const resolvedFile = fs.resolvePath('/non-existent');
      expect(resolvedFile).toBeNull();
    });
  });
});
