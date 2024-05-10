interface NextImageProps {
  /**
   * The path to the image file, either relative to your project's root directory or an absolute URL.
   */
  src: string;

  /**
   * A descriptive text alternative for the image, crucial for accessibility and SEO.
   */
  alt: string;

  /**
   * (Optional) The desired width of the image in pixels.
   */
  width?: number;

  /**
   * (Optional) The desired height of the image in pixels.
   */
  height?: number;

  /**
   * (Optional) Defines how the image should fit within its container:
   *  - 'fill': Stretches the image to fill the container (may distort aspect ratio).
   *  - 'intrinsic': Maintains the image's intrinsic aspect ratio.
   *  - 'responsive': Uses Next.js's responsive image optimization techniques (default).
   *  - 'fixed': Sets the image's width and height to the specified values (may not scale well).
   */
  layout?: 'fill' | 'intrinsic' | 'responsive' | 'fixed';

  /**
   * (Optional) A media query string that specifies different image sizes for various screen sizes, promoting responsive design.
   */
  sizes?: string;

  /**
   * (Optional) Controls the image quality for JPEG images, balancing file size and visual fidelity (0-100).
   */
  quality?: number;

  /**
   * (Optional) Prioritizes the loading of critical images above the fold.
   */
  priority?: boolean;

  /**
   * (Optional) Defines a placeholder image displayed while the actual image loads. Options include:
   *  - 'blur': A blurred version of the image.
   *  - 'empty': An empty container with the image's dimensions.
   */
  placeholder?: 'blur' | 'empty';

  /**
   * (Optional) Controls how the image content fits within its container, similar to CSS's `object-fit` property:
   *  - 'cover': Scales the image to cover the container while preserving aspect ratio.
   *  - 'contain': Scales the image to fit within the container while preserving aspect ratio.
   *  - 'fill': Stretches the image to fill the container (may distort aspect ratio).
   *  - 'none': Displays the image at its natural size.
   *  - 'scale-down': Scales the image down to fit within the container, maintaining aspect ratio.
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /**
   * (Optional) Defines the positioning of the image content within its container, using CSS-like syntax (e.g., `'top center'`).
   */
  objectPosition?: string;

  /**
   * (Optional) Adds a CSS class to the image element for further styling.
   */
  className?: string;

  /**
   * (Optional) Applies inline styles directly to the image element.
   */
  style?: React.CSSProperties;
}

const Image = async ({ src, alt, ...props }: NextImageProps) => {
  const NextImage = await import('next/image').then((module) => module.default);

  try {
    return <NextImage src={src} alt={alt} {...props} />;
  } catch {
    console.log('Not using Next.js');
    return <img src={src} {...props} />;
  }
};

export { Image };
