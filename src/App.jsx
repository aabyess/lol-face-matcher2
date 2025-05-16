import React, { useState } from 'react';
import { Upload, message, Card, Typography, Button } from 'antd';
import { InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import TimoBackground from './assets/Timo.png';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const App = () => {
  const [result, setResult] = useState(null);

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:8000/upload',
    showUploadList: false,
    onChange(info) {
      const { status, response } = info.file;

      if (status === 'done') {
        message.success(`${info.file.name} 업로드 성공!`);

        if (response) {
          if (response.top_matches) {
            setResult(response);  // ✅ 여기서 top_matches 기준으로 저장
          } else if (response.error) {
            message.warning('얼굴을 찾을 수 없습니다.');
            setResult(null);
          }
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} 업로드 실패.`);
        setResult(null);
      }
    },
  };

  const resetResult = () => {
    setResult(null);
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${TimoBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column', // 세로 방향으로 변경
        alignItems: 'center',
        justifyContent: 'flex-start', // 상단 정렬
        paddingTop: result ? '40px' : '120px', // 조건부 패딩
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        boxSizing: 'border-box',
      }}
    >
      {!result && (
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={1} style={{ fontFamily: 'Arial Black', color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
            MatchMyChampion
          </Title>
          <Text type="secondary" style={{ fontSize: '18px', color: '#eee' }}>
            Who Is Your Champ?
          </Text>
        </div>
      )}

      <div
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Title level={2}>리그 챔피언 닮은꼴 찾기</Title>

        {!result ? (
          <Dragger {...uploadProps} className="upload-box">
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: '48px', color: '#40a9ff' }} />
            </p>
            <p>사진 파일을 여기에 드래그하거나 클릭하세요</p>
            <p>JPG, PNG 등 이미지 파일만 업로드 가능합니다.</p>
          </Dragger>
        ) : (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {result.top_matches.map((champ, index) => (
              <Card
                key={champ.name}
                className="result-card"
                title={`TOP ${index + 1}`}
                style={{ width: 240 }}
                cover={
                  <img
                    alt={champ.name}
                    src={`/champions/${champ.name}`}
                    className="champion-image"
                  />
                }
              >
                <Title level={4}>{champ.name.replace('.png', '')}</Title>
                <Text className="match-confidence">
                  매칭률: {(champ.score * 100).toFixed(2)}%
                </Text>
              </Card>
            ))}
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                className="reset-button"
                onClick={resetResult}
              >
                다시 테스트 하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
