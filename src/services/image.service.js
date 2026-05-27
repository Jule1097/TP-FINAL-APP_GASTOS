import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export class ImageService {

    async takePicture() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt
            });

            return image.dataUrl;

        } catch (error) {
            console.error("Error al obtener imagen", error);
            return null;
        }
    }
}