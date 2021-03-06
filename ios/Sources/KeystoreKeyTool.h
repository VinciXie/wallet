//
//  KeystoreKeyTool.h
//  keystoreDemo
//
//  Created by WuJiLei on 2018/7/17.
//  Copyright © 2018年 bottos. All rights reserved.
//

#import <Foundation/Foundation.h>


typedef void(^completedBlock)(NSString *key,NSError *error);

@interface KeystoreKeyTool : NSObject
/*创建公私钥*/
-(void)creatPrivateKeyAndPublicKeyWithCompleted: (completedBlock)completedblock;
/*根据私钥和密码生成keystorekey*/ 
-(void)creatKeyStoreKeyWithPrivateKey:(NSString *)privateKey password:(NSString *)password completed: (completedBlock)completedblock;
/*根据keystoreKey和密码解出私钥*/
-(void)recoverPrivateKeyWithKeystoreKeyJson:(NSString *)keystoreKeyJson password:(NSString *)password completed: (completedBlock)completedblock;
@end
