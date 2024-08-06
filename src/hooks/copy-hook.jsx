import { useState } from "react";
import { toast } from "react-toastify";

export function CopyTextHook() {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async (content) => {
		try {
			if ("clipboard" in navigator) {
				await navigator.clipboard.writeText(content);
			} else {
				document.execCommand("copy", true, content);
			}
			setIsCopied(true);
			toast.success("Copied to clipboard!");
		} catch (error) {
			setIsCopied(false);
			console.error("Unable to copy to clipboard:", error);
		}
	};

	return { isCopied, copyToClipboard };
}
