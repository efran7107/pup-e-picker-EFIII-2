import { useState } from 'react';
import { dogPictures } from '../dog-pictures';
import { useDogs } from './providers/DogProvidor';
import { Dog } from '../types';
import toast from 'react-hot-toast';

export const CreateDogForm = () =>
	// no props allowed
	{
		const { dogs, isLoading, addDog } = useDogs();

		const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
		const defaultDog = {
			id: 0,
			name: '',
			image: selectedImage,
			description: '',
			isFavorite: false
		};
		const [dog, setDog] = useState<Dog>(defaultDog);

		return (
			<>
				{
					<form
						action=''
						id='create-dog-form'
						onSubmit={(e) => {
							e.preventDefault();
							setDog(defaultDog);
							addDog({ ...dog, id: dogs[dogs.length - 1].id + 1 });
							toast('Dog Created');
						}}>
						<h4>Create a New Dog</h4>
						<label htmlFor='name'>Dog Name</label>
						<input
							type='text'
							onChange={(e) => {
								setDog({ ...dog, name: e.target.value });
							}}
							disabled={isLoading}
							value={dog.name}
						/>
						<label htmlFor='description'>Dog Description</label>
						<textarea
							name=''
							id=''
							cols={80}
							rows={10}
							onChange={(e) => {
								setDog({ ...dog, description: e.target.value });
							}}
							disabled={isLoading}
							value={dog.description}></textarea>
						<label htmlFor='picture'>Select an Image</label>
						<select
							id=''
							onChange={(e) => {
								setSelectedImage(e.target.value);
								setDog({ ...dog, image: e.target.value });
							}}
							value={selectedImage}
							disabled={isLoading}>
							{Object.entries(dogPictures).map(([label, pictureValue]) => {
								return (
									<option
										value={pictureValue}
										key={pictureValue}>
										{label}
									</option>
								);
							})}
						</select>
						<input
							type='submit'
							value='submit'
							disabled={isLoading}
						/>
					</form>
				}
			</>
		);
	};
