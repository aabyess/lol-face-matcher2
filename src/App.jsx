
import React, { useState } from 'react';
import { Upload, message, Card, Typography, Button } from 'antd';
import { InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import TimoBackground from './assets/Timo.png';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const App = () => {
  const [genderLabel, setGenderLabel] = useState('알 수 없음');
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
          console.log('서버 응답:', response);
          if (response.top_matches) {
            setResult(response);
            const g = response.gender?.toLowerCase();
            if (g === 'man') setGenderLabel('남자');
            else if (g === 'woman') setGenderLabel('여자');
            else setGenderLabel('알 수 없음');
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
        flexDirection: 'column',  // 수직 정렬
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* ✅ 여기 넣으면 됩니다 */}
    <div style={{ textAlign: 'center', color: 'white', marginBottom: '24px' }}>
      <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 'bold' }}>MatchMyChampion</h1>
      <p style={{ margin: 0, fontSize: '20px' }}>Who Is Your Champ?</p>
    </div>
      <div
        style={{
          width: '800px',
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
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
          <>
            <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '20px' }}>
              감지된 성별: {genderLabel}
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              {result.top_matches.map((champ, index) => (
                <Card
                  key={champ.name}
                  title={`TOP ${index + 1}`}
                  style={{ width: '30%' }}
                  cover={
                    <img
                      alt={champ.name}
                      src={`/champions/${champ.name}`}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                  }
                >
                  <Title level={4} style={{ margin: 0 }}>{champ.name.replace('.png', '')}</Title>
                  <Text>매칭률: {(champ.score * 100).toFixed(2)}%</Text>
                </Card>
              ))}
            </div>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={resetResult}
            >
              다시 테스트 하기
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
