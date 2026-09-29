import React, { useRef, useEffect, useCallback } from 'react';
import { Point, Step } from '../types';

interface FootMeasurementCanvasProps {
  imageUrl: string;
  points: Point[];
  maxPoints: number;
  step: 'shape-measurement' | 'ratio-measurement';
  onAddPoint: (point: Point) => void;
  onDimensionsChange?: (dimensions: { width: number; height: number }) => void;
}

export const FootMeasurementCanvas: React.FC<FootMeasurementCanvasProps> = ({
  imageUrl,
  points,
  maxPoints,
  step,
  onAddPoint,
  onDimensionsChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Draw the image and points onto canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate display dimensions based on container width and image natural aspect ratio
    const containerWidth = containerRef.current?.clientWidth || 700;
    const maxWidth = Math.min(800, containerWidth > 50 ? containerWidth : 700);
    const maxHeight = 600;
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    const aspect = width / height;

    if (width > maxWidth || height > maxHeight) {
      if (aspect > 1) {
        width = maxWidth;
        height = width / aspect;
      } else {
        height = maxHeight;
        width = height * aspect;
      }
    }

    const roundedWidth = Math.round(width);
    const roundedHeight = Math.round(height);

    if (canvas.width !== roundedWidth || canvas.height !== roundedHeight) {
      canvas.width = roundedWidth;
      canvas.height = roundedHeight;
      if (onDimensionsChange) {
        onDimensionsChange({ width: roundedWidth, height: roundedHeight });
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    if (step === 'shape-measurement') {
      const refY = canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(0, refY);
      ctx.lineTo(canvas.width, refY);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach((point, index) => {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x, refY);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.65)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (index > 0) {
          ctx.beginPath();
          ctx.moveTo(points[index - 1].x, points[index - 1].y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        const lengthVal = Math.abs(point.y - refY).toFixed(0);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`${lengthVal}px`, point.x + 8, (point.y + refY) / 2);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(index + 1), point.x, point.y + 4);
      });
    } else if (step === 'ratio-measurement') {
      points.forEach((point, index) => {
        if (index === 1 && points.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        if (index === 2 && points.length >= 3) {
          ctx.beginPath();
          ctx.moveTo(points[1].x, points[1].y);
          ctx.lineTo(points[2].x, points[2].y);
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = index < 2 ? '#ef4444' : '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(index + 1), point.x, point.y + 4);
      });
    }
  }, [imageUrl, points, step]);

  // Load image whenever imageUrl changes
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      renderCanvas();
    };
    img.src = imageUrl;
    if (img.complete && img.naturalWidth > 0) {
      imgRef.current = img;
      renderCanvas();
    }
  }, [imageUrl, renderCanvas]);

  // Redraw when points change
  useEffect(() => {
    renderCanvas();
  }, [points, renderCanvas]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => renderCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderCanvas]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || points.length >= maxPoints) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const newPoint: Point = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };

    onAddPoint(newPoint);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-300 flex items-center justify-center min-h-[300px] w-full"
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="cursor-crosshair max-w-full h-auto block select-none"
      />
    </div>
  );
};
