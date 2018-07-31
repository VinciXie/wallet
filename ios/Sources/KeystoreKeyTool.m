//
//  KeystoreKeyTool.m
//  keystoreDemo
//
//  Created by WuJiLei on 2018/7/17.
//  Copyright © 2018年 bottos. All rights reserved.
//

#import "KeystoreKeyTool.h"
#import "rn_wallet-Swift.h"

@implementation KeystoreKeyTool
//swift的类方法调用失败, 创建对象方法
/*创建公私钥*/
-(void)creatPrivateKeyAndPublicKeyWithCompleted: (completedBlock)completedblock{
    NSError *error;
    NSString *key =  [KeystoreKeyCreatTool creatPrivateKeyAndPublicKeyAndReturnError:&error];
    if (error) {
        NSError *error = [NSError errorWithDomain:@"PrivateKeyAndPublicKey"
                                             code:-1
                                         userInfo:@{ NSLocalizedDescriptionKey : @"公私钥创建失败" }];
        completedblock(@"",error);
    }else{
        completedblock(key,nil);
    }
}
/*根据私钥和密码生成keystorekey*/
-(void)creatKeyStoreKeyWithPrivateKey:(NSString *)privateKey password:(NSString *)password completed: (completedBlock)completedblock{
    NSError *error;
    NSString *key =  [KeystoreKeyCreatTool creatKeyStoreKeyWithPrivateKey:privateKey password:password error:&error];
    if (error) {
        NSError *error = [NSError errorWithDomain:@"KeyStoreKey"
                                             code:-1
                                         userInfo:@{ NSLocalizedDescriptionKey : @"KeyStoreKey创建失败,请传入正确的privateKey/password" }];
        completedblock(@"",error);
    }else{
        completedblock(key,nil);
    }
    
}
/*根据keystoreKey和密码解出私钥*/
-(void)recoverPrivateKeyWithKeystoreKeyJson:(NSString *)keystoreKeyJson password:(NSString *)password completed: (completedBlock)completedblock{
    
    NSError *error;
    NSString *key =  [KeystoreKeyCreatTool recoverKeystoreKeyPrivateKeyWithKeystoreKeyJson:keystoreKeyJson password:password error:&error];
    if (error) {
        NSError *error = [NSError errorWithDomain:@"recoverPrivateKey"
                                             code:-1
                                         userInfo:@{ NSLocalizedDescriptionKey : @"获取PrivateKey失败,请传入正确的keystoreKeyJson/password" }];
        completedblock(@"",error);
    }else{
        completedblock(key,nil);
    }
    
}
@end
