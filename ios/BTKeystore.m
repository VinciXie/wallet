//
//  BTKeystore.m
//  rn_wallet
//
//  Created by 袁俊亮 on 2018/7/18.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "BTKeystore.h"
#import "KeystoreKeyTool.h"

@implementation BTKeystore
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createKeys:(RCTResponseSenderBlock)callback){
  KeystoreKeyTool *keystoreTool = [[KeystoreKeyTool alloc] init];
  [keystoreTool creatPrivateKeyAndPublicKeyWithCompleted:^(NSString *key, NSError *error) {
    callback(@[[NSNull null], key]);
  }];
}

RCT_EXPORT_METHOD(createKeystoreWithPrivateKey:(NSString *)privateKey password:(NSString *)password callback:(RCTResponseSenderBlock)callback){
  KeystoreKeyTool *keystoreTool = [[KeystoreKeyTool alloc] init];
  [keystoreTool creatKeyStoreKeyWithPrivateKey:privateKey password:password completed:^(NSString *key, NSError *error) {
    callback(@[[NSNull null], key]);
  }];
}


RCT_EXPORT_METHOD(recovePrivatekeyWithKeystore:(NSString *)keystore password:(NSString *)password callback:(RCTResponseSenderBlock)callback){
  KeystoreKeyTool *keystoreTool = [[KeystoreKeyTool alloc] init];
  [keystoreTool recoverPrivateKeyWithKeystoreKeyJson:keystore password:password completed:^(NSString *key, NSError *error) {
    callback(@[[NSNull null], key]);
  }];
}

@end
