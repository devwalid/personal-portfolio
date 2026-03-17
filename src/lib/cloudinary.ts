const CLOUD_NAME = 'dznc31ez2';

const VIDEO_MAP: Record<string, string> = {
  '1': '1_exada0',
  '2': '2_iugvgv',
  '3': '3_gun5ox',
  '4': '4_o4dxqm',
  '5': '5_ysovk1',
  '6': '6_lityes',
  '7': '7_whqz0n',
  '8': '8_tmzfl4',
  '9': '9_qfvbho',
  '10': '10_p37l6i',
  'DTC': 'DTC_yoiiod',
  'GCC': 'GCC_c7p44z',
  'IG-reels': 'IG-reels_fzyusv',
  'UGC': 'UGC_lckxis',
  'bf': 'bf_d0vad7',
  'coming-soon': 'coming-soon_av7b1x',
  'coming_soonl': 'coming_soonl_e4ert7',
  'eureka': 'eureka_bqthan',
  'long-to-short-form': 'long-to-short-form_ee9x4l',
  'motion-graphic': 'motion-graphic_nifmjd',
  'ss': 'ss_kqblp1',
  'talkinghead2': 'talkinghead2_y4hzfy',
};

/**
 * Convert a local video path like "/Videos/DTC.mp4"
 * to a Cloudinary URL.
 */
export function getCloudinaryUrl(localPath: string): string {
  const name = localPath.replace('/Videos/', '').replace('.mp4', '');
  const publicId = VIDEO_MAP[name];
  if (!publicId) {
    console.warn(`No Cloudinary mapping for: ${name}`);
    return localPath;
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}.mp4`;
}
