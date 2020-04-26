module.exports = {
  name: 'ngx-reactive-table',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-reactive-table',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
