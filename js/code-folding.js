document.addEventListener('DOMContentLoaded', function() {
  // 获取所有代码块
  const codeBlocks = document.querySelectorAll('.highlight');
  
  codeBlocks.forEach(block => {
    // 检查是否多行（是否需要折叠）
    const codeHeight = block.querySelector('pre').scrollHeight;
    const lineHeight = parseInt(getComputedStyle(block.querySelector('pre')).lineHeight);
    
    // 如果代码高度超过3行，添加折叠功能
    if (codeHeight > lineHeight * 3) {
      // 添加折叠类
      block.classList.add('collapsible', 'collapsed');
      
      // 检查是否已存在切换按钮
      let toggleBtn = block.querySelector('.code-toggle');
      
      // 如果不存在则创建切换按钮
      if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-toggle collapsed';
        toggleBtn.setAttribute('aria-label', '展开代码块');
        toggleBtn.setAttribute('title', '展开/折叠代码');
        
        // 插入到代码块中（复制按钮之前）
        const copyBtn = block.querySelector('.copy-btn');
        if (copyBtn) {
          copyBtn.parentNode.insertBefore(toggleBtn, copyBtn);
        } else {
          // 如果没有复制按钮，创建一个占位空间
          const codeHeader = document.createElement('div');
          codeHeader.className = 'code-header';
          codeHeader.style.position = 'relative';
          codeHeader.style.height = '30px';
          block.insertBefore(codeHeader, block.firstChild);
          codeHeader.appendChild(toggleBtn);
        }
      }
      
      // 添加点击事件
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (block.classList.contains('collapsed')) {
          // 展开代码块
          block.classList.remove('collapsed');
          block.classList.add('expanded');
          this.classList.remove('collapsed');
          this.classList.add('expanded');
          this.setAttribute('aria-label', '折叠代码块');
        } else {
          // 折叠代码块
          block.classList.remove('expanded');
          block.classList.add('collapsed');
          this.classList.remove('expanded');
          this.classList.add('collapsed');
          this.setAttribute('aria-label', '展开代码块');
        }
      });
      
      // 添加键盘支持
      toggleBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    }
  });
  
  // 处理代码复制功能
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const codeBlock = this.closest('.highlight');
      const codeText = codeBlock.querySelector('pre').innerText;
      
      // 使用Clipboard API复制文本
      navigator.clipboard.writeText(codeText).then(() => {
        // 显示复制成功提示
        const originalText = this.innerHTML;
        this.innerHTML = '✓';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('复制失败:', err);
      });
    });
  });
});