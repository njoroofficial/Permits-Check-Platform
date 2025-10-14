"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";

interface Document {
  id: string;
  name: string;
  file: File;
}

interface DocumentUploadProps {
  requiredDocuments: string[];
  onDocumentsChange: (documents: Document[]) => void;
}

export function DocumentUpload({
  requiredDocuments,
  onDocumentsChange,
}: DocumentUploadProps) {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    docType: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: docType,
        file,
      };
      const updatedDocs = [
        ...documents.filter((d) => d.name !== docType),
        newDoc,
      ];
      setDocuments(updatedDocs);
      onDocumentsChange(updatedDocs);
    }
  };

  const removeDocument = (docId: string) => {
    const updatedDocs = documents.filter((d) => d.id !== docId);
    setDocuments(updatedDocs);
    onDocumentsChange(updatedDocs);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Required Documents
        </CardTitle>
        <CardDescription>
          Please upload all required documents for your application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requiredDocuments.map((docType, index) => {
          const uploadedDoc = documents.find((d) => d.name === docType);

          return (
            <div key={index} className="space-y-2">
              <Label htmlFor={`doc-${index}`}>{docType}</Label>
              {uploadedDoc ? (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-primary" />
                    <span className="text-sm">{uploadedDoc.file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(uploadedDoc.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Input
                  id={`doc-${index}`}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, docType)}
                  className="cursor-pointer"
                />
              )}
            </div>
          );
        })}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Accepted formats:</strong> PDF, JPG, PNG (Max 5MB per file)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
