import * as React from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Icons } from "@/components/icons"

type FileUploadProps = {
  value?: string[]
  onChange?: (files: File[]) => void
  onRemove?: (index: number) => void
  accept?: string
  maxSize?: number
  maxFiles?: number
  disabled?: boolean
  className?: string
}

export function FileUpload({
  value = [],
  onChange,
  onRemove,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 1,
  disabled = false,
  className,
}: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    maxFiles,
    disabled,
    onDrop: (acceptedFiles) => {
      onChange?.(acceptedFiles)
    },
  } as DropzoneOptions)

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Icons.upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <span>放开以上传文件</span>
            ) : (
              <span>
                拖拽文件到此处或{" "}
                <span className="text-primary font-medium">点击上传</span>
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {accept && <div>支持的文件类型: {accept}</div>}
            {maxSize && (
              <div>最大文件大小: {Math.round(maxSize / 1024 / 1024)}MB</div>
            )}
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid gap-4">
          {value.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border p-2"
            >
              <div className="flex-1 truncate text-sm">{file}</div>
              {onRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onRemove(index)}
                >
                  <Icons.close className="h-4 w-4" />
                  <span className="sr-only">删除</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 