export enum ReportEnum {
  APPROVE_CHANGE_AD_AUTO_MORE_THAN_3_TIMES = 'approve-change-ad-auto-more-than-3-times',
  APPROVE_ADD_BRAND_OR_MODEL_AUTO = 'approve-add-brand-or-model-auto',
  APPROVE_ADD_REGION = 'approve-add-region',
}

// export class Approve3TimesOfCarResDto {
//   @ApiProperty({
//     example:
//       'You have edited the ad 3 times. It is now being reviewed. Please wait for confirmation.',
//     description: 'Message indicating attempts',
//   })
//   message: string;
// }
//
// export class ApproveBrandOfCarResDto {
//   @ApiProperty({
//     example:
//       'Sorry, but no car was found for your request. The request has been sent to the manager, please wait' +
//       ' until he approves it.',
//     description: 'Message indicating the status of the request',
//   })
//   message: string;
// }
//
// export class ApproveRegionOfCarResDto {
//   @ApiProperty({
//     example:
//       'Sorry, no car was found in the specified region. The request has been sent to the manager for approval.' +
//       ' Please  wait for confirmation.',
//     description:
//       'Message indicating the status of the request related to car region approval',
//   })
//   message: string;
// }
