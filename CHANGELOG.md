# Changelog

All notable changes to this project will be documented in this file.
Include any required SharePoint changes that will be needed to deploy you PR
Update the version number in package.json when submitting your PR

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [Unreleased]

- (Keep your changes here until you have a release version)

### Added

- Initial release of CAFTOP

### Types of changes

- Added for new features.
- Changed for changes in existing functionality.
- Deprecated for soon-to-be removed features.
- Removed for now removed features.
- Fixed for any bug fixes.
- Security in case of vulnerabilities.

## [1.0.5] - 2025-12-18

### Added

- Technical Order Format selection

## [1.0.4] - 2025-03-xx

### Added

- Identifier added to left navigation panel to let user know what CAFTOP they are currently viewing/editing
- Added mew role of Admin, which are those users in the Owners group. Allowed them to do any action a Focal Point could
- Added ability for Admin to Delete CAFTOPs

## [1.0.3] - 2025-02-13

### Fixed

- wizardMaxStep could be moved down in number under certain circumstances, as it was comparing to cached wizardMaxStep, instead of the one being incremented in the session

## [1.0.2] - 2025-01-25

### Changed

- Only show the CAFTOPs link to those with the Focal Point role
- Removed PnPJS imports that aren't used by this application

## [1.0.1] - 2024-12-31

- Refactor MILSTD3048 Zod rules for better typescript support

## [1.0.0] - 2024-12-23

- Initial release of the CAFTOP Narrative Tool

### Added

- Initial release capabilities for generating a CAFTOP Narrative
