"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

export default function QrCodeModal({ open, onClose, value }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="text-center w-auto h-auto">
        <DialogHeader>
          <DialogTitle className={"pb-4 border-b-2 "}>Scan QR</DialogTitle>
        </DialogHeader>
        <p className="text-sm">Scan this QR with your AyuProFit App to mark attendance</p>
        <div className="flex justify-center mt-4">
            {/* temp image this will be replaced with the qr code that backend provides */}
          <Image
                      src="/qr.png"
                      alt="QR code to scan"
                      width={200}
                      height={200}
                    />
        </div>
      </DialogContent>
    </Dialog>
  );
}

