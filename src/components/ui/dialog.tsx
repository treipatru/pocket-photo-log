import { useEffect, useRef, useState } from "react";

type DialogProps = {
	children: React.ReactNode;
	isOpen: boolean;
	title: string;
};

export default function Dialog({
	children,
	isOpen,
	title,
}: Readonly<DialogProps>) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		setIsModalOpen(isOpen);
	}, [isOpen]);

	useEffect(() => {
		const modalElement = dialogRef.current;
		if (!modalElement) {
			return
		}

		if (isModalOpen) {
			modalElement.showModal();
		} else {
			modalElement.close();
		}
	}, [isModalOpen]);

	return (
		<dialog id="tag-modal" className="modal" ref={dialogRef}>
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-4">{title}</h3>
				{children}
			</div>
		</dialog>
	)
}
