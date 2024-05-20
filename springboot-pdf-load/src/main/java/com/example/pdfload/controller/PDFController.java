package com.example.pdfload.controller;

import org.apache.commons.io.FileUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * @author zhouquan
 * @description pdf分片加载
 * @data 2024-02-23
 **/
@RestController
@RequestMapping("/v1/pdf")
public class PDFController {

    /**
     * pdf分片加载的后端实现
     *
     * @param response
     * @param request
     * @throws FileNotFoundException
     */
    @GetMapping("/load")
    public void loadPDFByPage(HttpServletResponse response, HttpServletRequest request) throws FileNotFoundException {

        // 获取pdf文件，建议pdf大小超过20mb以上
        File pdf = ResourceUtils.getFile("classpath:需要分片加载的pdf.pdf");
        byte[] pdfData = new byte[0];
        try {
            pdfData = FileUtils.readFileToByteArray(pdf);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 以下为pdf分片的代码
        try (InputStream is = new ByteArrayInputStream(pdfData);
             BufferedInputStream bis = new BufferedInputStream(is);
             OutputStream os = response.getOutputStream();
             BufferedOutputStream bos = new BufferedOutputStream(os)) {

            // 下载的字节范围
            int startByte, endByte, totalByte;

            // 获取文件总大小
            int fileSize = pdfData.length;

            int minSize = 1024 * 1024;
            // 如果文件小于1 MB，直接返回数据，不需要进行分片
            if (fileSize < minSize) {
                // 直接返回整个文件
                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/octet-stream");
                response.setContentLength(fileSize);
                bos.write(pdfData);
                return;
            }

            // 根据HTTP请求头的Range字段判断是否为断点续传
            if (request == null || request.getHeader("range") == null) {
                // 如果是首次请求，返回全部字节范围 bytes 0-7285040/7285041
                totalByte = is.available();
                startByte = 0;
                endByte = totalByte - 1;
                response.setStatus(HttpServletResponse.SC_OK);
 	// 写入一些数据到输出流中,否则火狐浏览器会报错：ns_error_net_partinal_transfer
                bos.write(1);
            } else {
                // 断点续传逻辑
                String[] range = request.getHeader("range").replaceAll("[^0-9\\-]", "").split("-");
                // 文件总大小
                totalByte = is.available();
                // 下载起始位置
                startByte = Integer.parseInt(range[0]);
                // 下载结束位置
                endByte = range.length > 1 ? Integer.parseInt(range[1]) : totalByte - 1;

                // 跳过输入流中指定的起始位置
                bis.skip(startByte);

                // 表示服务器成功处理了部分 GET 请求，返回了客户端请求的部分数据。
                response.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);

                int bytesRead, length = endByte - startByte + 1;
                byte[] buffer = new byte[1024 * 64];
                while ((bytesRead = bis.read(buffer, 0, Math.min(buffer.length, length))) != -1 && length > 0) {
                    bos.write(buffer, 0, bytesRead);
                    length -= bytesRead;
                }
            }

            // 表明服务器支持分片加载
            response.setHeader("Accept-Ranges", "bytes");
            // Content-Range: bytes 0-65535/408244，表明此次返回的文件范围
            response.setHeader("Content-Range", "bytes " + startByte + "-" + endByte + "/" + totalByte);
            // 告知浏览器这是一个字节流，浏览器处理字节流的默认方式就是下载
            response.setContentType("application/octet-stream");
            // 表明该文件的所有字节大小
            response.setContentLength(endByte - startByte + 1);
            // 需要设置此属性，否则浏览器默认不会读取到响应头中的Accept-Ranges属性，
            // 因此会认为服务器端不支持分片，所以会直接全文下载
            response.setHeader("Access-Control-Expose-Headers", "Accept-Ranges,Content-Range");
            // 第一次请求直接刷新输出流，返回响应
            response.flushBuffer();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
