/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : live

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 07/02/2022 17:14:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for barrage
-- ----------------------------
DROP TABLE IF EXISTS `barrage`;
CREATE TABLE `barrage`  (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `userId` int(0) NOT NULL COMMENT '发布者id',
  `videoId` int(0) NOT NULL DEFAULT 0 COMMENT '对应视频id',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '弹幕内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of barrage
-- ----------------------------

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect`  (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `videoId` int(0) NOT NULL COMMENT '视频id',
  `userId` int(0) NOT NULL COMMENT '用户id',
  `type` enum('video','live') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '收藏类型',
  `liveId` int(0) NOT NULL COMMENT '直播id',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_d50d81779d00422e7c7ecbc966`(`videoId`) USING BTREE,
  CONSTRAINT `FK_d50d81779d00422e7c7ecbc966b` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES ('2022-01-22 14:57:56.747766', '2022-01-22 14:57:56.747766', 1, 14, 9, 'video', 0);
INSERT INTO `collect` VALUES ('2022-01-22 15:11:16.031571', '2022-01-22 15:11:16.031571', 2, 15, 9, 'video', 0);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `userId` int(0) NULL DEFAULT NULL COMMENT '用户ID',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '内容',
  `parentId` int(0) NOT NULL DEFAULT 0 COMMENT '父级评论id',
  `level` int(0) NOT NULL DEFAULT 1 COMMENT '评论层级，1为一级评论，2为二级评论',
  `videoId` int(0) NULL DEFAULT NULL COMMENT '主键，自增',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_fae151444dcca85704ef1fbb285`(`videoId`) USING BTREE,
  INDEX `FK_c0354a9a009d3bb45a08655ce3b`(`userId`) USING BTREE,
  CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_fae151444dcca85704ef1fbb285` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('2022-01-16 21:32:08.100178', '2022-01-16 21:32:08.100178', 5, 9, '撒谎多久啊十大建设', 0, 1, 14);
INSERT INTO `comment` VALUES ('2022-01-16 21:34:30.280924', '2022-01-16 21:34:30.280924', 6, 9, '差距拉开收到', 0, 1, 14);
INSERT INTO `comment` VALUES ('2022-01-16 21:34:41.002978', '2022-01-16 21:34:41.002978', 7, 9, '1111', 0, 1, 14);
INSERT INTO `comment` VALUES ('2022-01-16 21:34:43.960281', '2022-01-16 21:34:43.960281', 8, 9, '1111', 0, 1, 15);
INSERT INTO `comment` VALUES ('2022-01-16 21:34:47.593180', '2022-01-16 21:34:47.593180', 9, 9, '2312312312', 0, 1, 15);
INSERT INTO `comment` VALUES ('2022-01-16 21:58:29.504823', '2022-01-16 21:58:29.504823', 10, 9, '哈哈哈', 0, 1, 15);

-- ----------------------------
-- Table structure for live
-- ----------------------------
DROP TABLE IF EXISTS `live`;
CREATE TABLE `live`  (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `upId` int(0) NOT NULL COMMENT 'upId',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '直播标题',
  `classification` int(0) NOT NULL COMMENT '直播分类',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '直播url地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of live
-- ----------------------------

-- ----------------------------
-- Table structure for thumb_up
-- ----------------------------
DROP TABLE IF EXISTS `thumb_up`;
CREATE TABLE `thumb_up`  (
  `userId` int(0) NOT NULL,
  `videoId` int(0) NOT NULL,
  PRIMARY KEY (`userId`, `videoId`) USING BTREE,
  INDEX `IDX_9f2a9e77caa2ad630fbbce4d80`(`userId`) USING BTREE,
  INDEX `IDX_a7a782e93a39ca75de5e682178`(`videoId`) USING BTREE,
  CONSTRAINT `FK_9f2a9e77caa2ad630fbbce4d80c` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_a7a782e93a39ca75de5e682178c` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of thumb_up
-- ----------------------------
INSERT INTO `thumb_up` VALUES (8, 15);
INSERT INTO `thumb_up` VALUES (9, 15);
INSERT INTO `thumb_up` VALUES (9, 16);
INSERT INTO `thumb_up` VALUES (16, 16);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话',
  `gender` int(0) NOT NULL DEFAULT 3 COMMENT '性别,1男2女3未知',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `type` int(0) NOT NULL DEFAULT 1 COMMENT '0超级管理员1普通',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2021-11-22 19:42:49.102580', '2021-11-22 19:42:49.102580', 4, '123', NULL, NULL, 3, NULL, '$2a$10$M8yejoDPHVMlQqQ/.4Ez3eGX.4MX69eN/Ggciqqx24JcWZd9wmrq2', '1234', 1);
INSERT INTO `user` VALUES ('2021-12-01 18:58:47.859074', '2021-12-01 18:58:47.859074', 5, 'string', '2', 'str2ing', 0, NULL, '$2a$10$rokx4GudBOw6uMZ1YrpJvuiNDecUsE5fa9MZe6ZNw5TBi1upDw8iq', '0001', 1);
INSERT INTO `user` VALUES ('2021-12-01 19:02:15.172934', '2021-12-01 19:02:15.172934', 6, '喜喜', NULL, NULL, 3, NULL, '$2a$10$tS8kTioXPw/B0S9zDr5MXeXBy725llzZsyLiGlqHQZ.FQ6E2AXV6u', '0002', 1);
INSERT INTO `user` VALUES ('2021-12-03 20:22:18.085191', '2022-01-09 12:38:43.000000', 8, '邵雨涵', NULL, NULL, 3, NULL, '$2a$10$Itl7ZV1Y9T4AG7.epDPnLumveN0m1aPHoMNwUJ0aTXp2WKvLRyXYW', '6666', 1);
INSERT INTO `user` VALUES ('2021-12-03 20:24:32.037033', '2021-12-04 15:58:44.385946', 9, '就是对', 'string', 'string', 1, '2021-12-04', '$2a$10$pXIxYG0vqkXvQG9qxPY5o.kibgwGaJ9BeiRnmMnp5i6DPRmVATQim', '8888', 1);
INSERT INTO `user` VALUES ('2021-12-03 20:50:12.717046', '2021-12-03 20:50:12.717046', 10, '0004', NULL, NULL, 3, NULL, '$2a$10$PPFK3aj7KTQXTENMcev0q.LM/UMKxoVS64rm2RWNlIo6iG/UH0Nvy', '0004', 1);
INSERT INTO `user` VALUES ('2021-12-03 21:05:30.132801', '2021-12-03 21:05:30.132801', 11, '10086', NULL, NULL, 3, NULL, '$2a$10$uOMx0LzelU3tkDhtwWNdKeqX9n3FvmrI.fJ04c/Dhe0/oUjapzJJu', '10086', 1);
INSERT INTO `user` VALUES ('2021-12-03 21:11:13.129638', '2021-12-03 21:11:13.129638', 12, 'WtI5HAqku5', NULL, NULL, 3, NULL, '$2a$10$Ovc1JBmvwsTEuqHLZzjwYO0RMw8/lZ3CgKv3pCsnEiJXkQtAJGXcC', '10010', 1);
INSERT INTO `user` VALUES ('2021-12-03 21:12:03.711418', '2021-12-03 21:12:03.711418', 13, 'User-qldmPpyHBD', NULL, NULL, 3, NULL, '$2a$10$qOq94rk6qgYXf6B8XxBkA.2enJBTZCx/QHlvDJJZu7BK3GPKo5o1O', '1111', 1);
INSERT INTO `user` VALUES ('2021-12-04 14:41:31.207576', '2021-12-04 14:41:31.207576', 14, '用户UAlUbeiF2F', NULL, NULL, 3, NULL, '$2a$10$FwNU84HMmWbbrs7tg7ugre5OtMmqPrPywLk7up9ogIKr1CJdQK8h2', '0005', 1);
INSERT INTO `user` VALUES ('2021-12-08 14:41:43.705087', '2021-12-08 14:41:43.705087', 15, '用户1aTA4QbWDz', NULL, NULL, 3, NULL, '$2a$10$NFfLODHCnA26gdWr.8HVZu9Z1TWBfjFlNlzWE6YF/ZQzkDWIhzUk6', '2222', 1);
INSERT INTO `user` VALUES ('2021-12-08 14:43:06.128806', '2021-12-08 14:43:06.128806', 16, '用户W-zCArbnNW', NULL, NULL, 3, NULL, '$2a$10$14mARrkebvzf4aSEg9TjCOM9U2.c5PmsXkZ/18Pc2T0TnoHvaFBfq', '4444', 1);
INSERT INTO `user` VALUES ('2022-01-01 22:40:25.640162', '2022-01-01 22:40:25.640162', 17, '用户9prYOp0EA1', NULL, NULL, 3, NULL, '$2a$10$uM/ollJeWul0koOZUF5VeO0PxqrD7pFP3OGpNar25rYIl.cAf.xVy', '555588', 1);

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video`  (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `upId` int(0) NOT NULL COMMENT '发布者id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '视频标题',
  `thumbUp` int(0) NOT NULL DEFAULT 0 COMMENT '点赞数',
  `collections` int(0) NOT NULL DEFAULT 0 COMMENT '收藏数',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视频url地址',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视频封面',
  `class` int(0) NOT NULL COMMENT '视频分类',
  `view` int(0) NOT NULL DEFAULT 0 COMMENT '观看次数',
  `share` int(0) NOT NULL DEFAULT 0 COMMENT '转发数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('2022-01-09 14:48:52.609498', '2022-01-09 14:48:52.609498', 14, 1, '测试案例', 0, 0, '2022-01-09/tDCRdvff7kt_YJ4j.mp4', '2022-01-09/AMPPehL_pfJD9W4n.jpg', 2, 0, 0);
INSERT INTO `video` VALUES ('2022-01-16 18:05:23.955054', '2022-01-22 15:11:16.000000', 15, 4, 'haha', 0, 0, NULL, NULL, 1, 0, 0);
INSERT INTO `video` VALUES ('2022-01-16 20:56:29.685992', '2022-01-25 16:45:35.000000', 16, 1, '胜多负少', 2, 0, NULL, NULL, 1, 0, 0);

SET FOREIGN_KEY_CHECKS = 1;
