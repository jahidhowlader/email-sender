import fs from 'fs/promises';
import path from 'path';

const deleteFilesInUploads = async (folderPath: string) => {
    try {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stat = await fs.lstat(filePath);

            if (stat.isFile()) {
                await fs.unlink(filePath);
            }
        }
    }
    catch (error) {
        throw new Error('Failed to delete file of uploads folder..')
    }
};

export default deleteFilesInUploads