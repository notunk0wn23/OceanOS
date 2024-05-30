class FSFileExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileSystemDirectoryError";
    }
}
