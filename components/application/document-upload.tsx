"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadProps {
  requiredDocuments: string[];
  onDocumentsChange: (documents: any[]) => void;
}

// Helper function to convert document name to valid enum value
function getDocumentTypeEnum(docName: string): string {
  const mapping: Record<string, string> = {
    "National ID Copy": "NATIONAL_ID_COPY",
    "Business Registration Certificate": "BUSINESS_REGISTRATION_CERTIFICATE",
    "Tax Compliance Certificate": "TAX_COMPLIANCE_CERTIFICATE",
    "Location Map/GPS Coordinates": "LOCATION_MAP_GPS_COORDINATES",
  };

  return mapping[docName] || "OTHER";
}

export function DocumentUpload({
  requiredDocuments,
  onDocumentsChange,
}: DocumentUploadProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, any>>({});

  const handleFileChange = async (
    docType: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the file
    const fileUrl = URL.createObjectURL(file);

    const docData = {
      name: docType,
      fileName: file.name,
      size: file.size,
      type: file.type,
      mimeType: file.type,
      documentType: getDocumentTypeEnum(docType), // Use the helper function
      fileUrl: fileUrl, // This is a temporary URL
      preview: fileUrl,
      url: fileUrl,
      file: file, // Keep the original file for actual upload
    };

    const updated = { ...uploadedDocs, [docType]: docData };
    setUploadedDocs(updated);

    // Convert to array and pass to parent
    const docsArray = requiredDocuments
      .filter((doc) => updated[doc])
      .map((doc) => updated[doc]);

    onDocumentsChange(docsArray);
  };

  const handleRemove = (docType: string) => {
    const updated = { ...uploadedDocs };

    // Revoke the blob URL to prevent memory leaks
    if (updated[docType]?.fileUrl) {
      URL.revokeObjectURL(updated[docType].fileUrl);
    }

    delete updated[docType];
    setUploadedDocs(updated);

    const docsArray = requiredDocuments
      .filter((doc) => updated[doc])
      .map((doc) => updated[doc]);

    onDocumentsChange(docsArray);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requiredDocuments.map((docType) => (
          <div key={docType} className="space-y-2">
            <Label htmlFor={`doc-${docType}`}>{docType} *</Label>
            {!uploadedDocs[docType] ? (
              <div className="flex items-center gap-2">
                <Input
                  id={`doc-${docType}`}
                  type="file"
                  onChange={(e) => handleFileChange(docType, e)}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="cursor-pointer"
                />
                <Upload className="w-4 h-4 text-muted-foreground" />
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">
                      {uploadedDocs[docType].fileName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedDocs[docType].size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(docType)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        <p className="text-sm text-muted-foreground">
          Accepted formats: PDF, JPG, PNG (Max 5MB per file)
        </p>
      </CardContent>
    </Card>
  );
}
